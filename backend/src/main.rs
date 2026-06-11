use axum::{
    extract::State,
    http::{StatusCode, Method},
    response::IntoResponse,
    routing::post,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{sqlite::SqliteConnectOptions, SqlitePool};
use std::net::SocketAddr;
use std::str::FromStr;
use tower_http::cors::{Any, CorsLayer};

#[derive(Deserialize, Serialize, Debug)]
struct ContactForm {
    name: String,
    email: String,
    message: String,
}

#[derive(Serialize)]
struct ApiResponse {
    success: bool,
    message: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables from .env file if present
    let _ = dotenvy::dotenv();

    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "sqlite://contacts.db".to_string());

    let port = std::env::var("PORT")
        .unwrap_or_else(|_| "5000".to_string())
        .parse::<u16>()
        .unwrap_or(5000);

    println!("Database URL: {}", database_url);
    println!("Server starting on port: {}", port);

    // Parse the connection options and enable auto-creation
    let connection_options = SqliteConnectOptions::from_str(&database_url)?
        .create_if_missing(true);

    // Create the SQLite database connection pool
    let pool = SqlitePool::connect_with(connection_options).await?;

    // Create table if not exists
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .execute(&pool)
    .await?;

    println!("Database initialized and migrated.");

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin(Any) // In a real app, restrict this to your frontend domain
        .allow_methods([Method::POST])
        .allow_headers(Any);

    // Build routes
    let app = Router::new()
        .route("/api/contact", post(submit_contact))
        .layer(cors)
        .with_state(pool);

    // Run the server
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    println!("Listening on {}", addr);
    axum::serve(listener, app).await?;

    Ok(())
}

async fn submit_contact(
    State(pool): State<SqlitePool>,
    Json(payload): Json<ContactForm>,
) -> impl IntoResponse {
    println!("Received contact form submission: {:?}", payload);

    if payload.name.trim().is_empty()
        || payload.email.trim().is_empty()
        || payload.message.trim().is_empty()
    {
        return (
            StatusCode::BAD_REQUEST,
            Json(ApiResponse {
                success: false,
                message: "All fields are required and cannot be empty".to_string(),
            }),
        );
    }

    // Insert contact message into SQLite database
    let result = sqlx::query(
        "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
    )
    .bind(&payload.name)
    .bind(&payload.email)
    .bind(&payload.message)
    .execute(&pool)
    .await;

    match result {
        Ok(_) => (
            StatusCode::CREATED,
            Json(ApiResponse {
                success: true,
                message: "Your message has been saved successfully!".to_string(),
            }),
        ),
        Err(err) => {
            eprintln!("Database error saving contact submission: {:?}", err);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ApiResponse {
                    success: false,
                    message: "Internal server error saving message".to_string(),
                }),
            )
        }
    }
}

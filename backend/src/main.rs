use axum::{
    extract::State,
    http::{HeaderMap, Method, StatusCode},
    response::IntoResponse,
    routing::{get, post},
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

#[derive(Serialize, sqlx::FromRow)]
struct Contact {
    id: i64,
    name: String,
    email: String,
    message: String,
    created_at: Option<String>,
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
        .allow_methods([Method::GET, Method::POST])
        .allow_headers(Any);

    // Build routes
    let app = Router::new()
        .route("/api/contact", post(submit_contact))
        .route("/api/contacts", get(get_contacts))
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

async fn get_contacts(
    State(pool): State<SqlitePool>,
    headers: HeaderMap,
) -> impl IntoResponse {
    let admin_key = std::env::var("ADMIN_API_KEY").unwrap_or_else(|_| "admin_secret_123".to_string());

    let auth_valid = headers
        .get("Authorization")
        .and_then(|value| value.to_str().ok())
        .map(|token| token.trim_start_matches("Bearer ").trim() == admin_key)
        .unwrap_or(false);

    if !auth_valid {
        return (
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({
                "success": false,
                "message": "Unauthorized: Invalid or missing token"
            })),
        ).into_response();
    }

    let result = sqlx::query_as::<_, Contact>(
        "SELECT id, name, email, message, strftime('%Y-%m-%d %H:%M:%S', created_at) as created_at FROM contacts ORDER BY created_at DESC"
    )
    .fetch_all(&pool)
    .await;

    match result {
        Ok(contacts) => (
            StatusCode::OK,
            Json(serde_json::json!({
                "success": true,
                "contacts": contacts
            })),
        ).into_response(),
        Err(err) => {
            eprintln!("Database error fetching contacts: {:?}", err);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(serde_json::json!({
                    "success": false,
                    "message": "Internal server error fetching contacts"
                })),
            ).into_response()
        }
    }
}

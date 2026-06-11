use actix_cors::Cors;
use actix_web::{
    get, post, web, App, HttpResponse, HttpServer, Responder
};
use serde::{Deserialize, Serialize};
use sqlx::{sqlite::SqliteConnectOptions, SqlitePool};
use std::str::FromStr;

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

#[actix_web::main]
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

    // Start HttpServer
    HttpServer::new(move || {
        // Configure CORS
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST"])
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(pool.clone()))
            .service(submit_contact)
            .service(get_contacts)
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await?;

    Ok(())
}

#[post("/api/contact")]
async fn submit_contact(
    pool: web::Data<SqlitePool>,
    payload: web::Json<ContactForm>,
) -> impl Responder {
    println!("Received contact form submission: {:?}", payload);

    if payload.name.trim().is_empty()
        || payload.email.trim().is_empty()
        || payload.message.trim().is_empty()
    {
        return HttpResponse::BadRequest().json(ApiResponse {
            success: false,
            message: "All fields are required and cannot be empty".to_string(),
        });
    }

    // Insert contact message into SQLite database
    let result = sqlx::query(
        "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
    )
    .bind(&payload.name)
    .bind(&payload.email)
    .bind(&payload.message)
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(_) => HttpResponse::Created().json(ApiResponse {
            success: true,
            message: "Your message has been saved successfully!".to_string(),
        }),
        Err(err) => {
            eprintln!("Database error saving contact submission: {:?}", err);
            HttpResponse::InternalServerError().json(ApiResponse {
                success: false,
                message: "Internal server error saving message".to_string(),
            })
        }
    }
}

#[get("/api/contacts")]
async fn get_contacts(
    pool: web::Data<SqlitePool>,
    req: actix_web::HttpRequest,
) -> impl Responder {
    let admin_key = std::env::var("ADMIN_API_KEY").unwrap_or_else(|_| "admin_secret_123".to_string());

    let headers = req.headers();
    let auth_valid = headers
        .get("Authorization")
        .and_then(|value| value.to_str().ok())
        .map(|token| token.trim_start_matches("Bearer ").trim() == admin_key)
        .unwrap_or(false);

    if !auth_valid {
        return HttpResponse::Unauthorized().json(serde_json::json!({
            "success": false,
            "message": "Unauthorized: Invalid or missing token"
        }));
    }

    let result = sqlx::query_as::<_, Contact>(
        "SELECT id, name, email, message, strftime('%Y-%m-%d %H:%M:%S', created_at) as created_at FROM contacts ORDER BY created_at DESC"
    )
    .fetch_all(pool.get_ref())
    .await;

    match result {
        Ok(contacts) => HttpResponse::Ok().json(serde_json::json!({
            "success": true,
            "contacts": contacts
        })),
        Err(err) => {
            eprintln!("Database error fetching contacts: {:?}", err);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "success": false,
                "message": "Internal server error fetching contacts"
            }))
        }
    }
}

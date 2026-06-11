# Multi-stage build Dockerfile for Axum Rust backend
# Stage 1: Build stage
FROM rust:1.80-slim-bookworm AS builder

WORKDIR /usr/src/app

# Install build dependencies
RUN apt-get update && apt-get install -y pkg-config libssl-dev build-essential sqlite3 && rm -rf /var/lib/apt/lists/*

# Copy the Cargo configuration and build files
COPY Cargo.toml ./
COPY src/ ./src/

# Compile the release binary
RUN cargo build --release

# Stage 2: Minimal runtime stage
FROM debian:bookworm-slim

WORKDIR /app

# Install minimal runtime packages (libsqlite3 is required by sqlx-sqlite at runtime)
RUN apt-get update && apt-get install -y libsqlite3-0 ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy the compiled binary from builder
COPY --from=builder /usr/src/app/target/release/backend /app/backend

# Create directory for persistent SQLite database storage
RUN mkdir -p /app/data

# Default environment variables
ENV PORT=5000
ENV DATABASE_URL=sqlite:///app/data/contacts.db

# Expose the server port
EXPOSE 5000

# Start application
CMD ["/app/backend"]

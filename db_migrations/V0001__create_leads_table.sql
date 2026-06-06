CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name TEXT,
    contact TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
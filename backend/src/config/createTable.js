import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const createTables = async () => {
    try {
        // Users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE,
                avatar_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Messages Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                likes INT DEFAULT 0,
                is_anonymous BOOLEAN DEFAULT FALSE,
                is_deleted BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Comments Table - Fixed the updated_at syntax
        await pool.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                message_id INT REFERENCES messages(id) ON DELETE CASCADE,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                parent_comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                likes INT DEFAULT 0,
                is_deleted BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Reactions Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reactions (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                message_id INT REFERENCES messages(id) ON DELETE CASCADE,
                comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
                reaction_type VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create update_timestamp function
        await pool.query(`
            CREATE OR REPLACE FUNCTION update_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        // Create triggers for the messages table
        await pool.query(`
            DROP TRIGGER IF EXISTS update_messages_timestamp ON messages;
            CREATE TRIGGER update_messages_timestamp
            BEFORE UPDATE ON messages
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamp();
        `);

        // Create triggers for the comments table
        await pool.query(`
            DROP TRIGGER IF EXISTS update_comments_timestamp ON comments;
            CREATE TRIGGER update_comments_timestamp
            BEFORE UPDATE ON comments
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamp();
        `);

        console.log('Tables created successfully!');
    } catch (error) {
        console.error('Error creating tables:', error.message);
    } finally {
        await pool.end();
    }
};

createTables();
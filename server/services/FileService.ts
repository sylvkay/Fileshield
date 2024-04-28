import { Pool } from "pg";
import { FileMetadata } from "../models/File";
import pool from "../db/connect";

const createFileMetadata = async (metadata: FileMetadata): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO file_metadata (user_id, file_name, cloud_url, cloud_provider, encryption_method, file_size)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values: any[] = [
      metadata.user_id,
      metadata.file_name,
      metadata.cloud_url,
      metadata.cloud_provider,
      metadata.encryption_method,
      metadata.file_size,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

async function getFileOwnerId(fileId: number): Promise<number | null> {
  const client = await pool.connect();
  try {
    const query = "SELECT user_id FROM file_metadata WHERE id = $1";
    const { rows } = await client.query(query, [fileId]);
    return rows[0]?.user_id ?? null;
  } finally {
    client.release();
  }
}

const getFileMetadataById = async (
  id: number
): Promise<FileMetadata | undefined> => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM file_metadata WHERE id = $1";
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};
const getUserFilesById = async (id: number): Promise<FileMetadata[]> => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM file_metadata WHERE user_id = $1";
    const { rows } = await client.query(query, [id]);
    return rows;
  } finally {
    client.release();
  }
};

const updateFileMetadata = async (
  id: number,
  metadata: FileMetadata
): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE file_metadata
      SET user_id = $1, file_name = $2, cloud_url = $3, cloud_provider = $4, encryption_method = $5
      WHERE id = $6
    `;
    const values: any[] = [
      metadata.user_id,
      metadata.file_name,
      metadata.cloud_url,
      metadata.cloud_provider,
      metadata.encryption_method,
      id,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const deleteFileMetadataById = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM file_metadata WHERE id = $1";
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

export {
  createFileMetadata,
  getUserFilesById,
  getFileMetadataById,
  updateFileMetadata,
  deleteFileMetadataById,
  getFileOwnerId,
};

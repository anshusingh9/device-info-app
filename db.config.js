import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";
import dotenv from "dotenv"
dotenv.config();

// Create a global PrismaClient instance with logging enabled
const globalClient = new PrismaClient({
  log: ["query"], // Enables logging of queries
});
// Extend the PrismaClient instance with the field encryption extension
export const prisma = globalClient.$extends(
  fieldEncryptionExtension({
        // Don't version hardcoded keys though, this is an example:
        encryptionKey: process.env.DB_ENCRYPTION_KEY
      }) // Adds field encryption functionality
);

export default prisma;
 
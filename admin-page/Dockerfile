# Stage 1: Build the Next.js application
FROM node:18.16.1-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:18.16.1-alpine

# Set working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=builder /app/.next ./.next

# Copy other required files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install production dependencies
RUN npm ci --production

# Set environment variables, if necessary
# ENV VARIABLE_NAME value

# Expose the desired port
EXPOSE 8080

# Start the Next.js application
CMD ["npm", "start"]

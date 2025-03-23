#!/bin/bash

# Create a temporary directory if it doesn't exist
TEMP_DIR="$HOME/.local/bin"
mkdir -p "$TEMP_DIR"

# Create a docker-compose wrapper script
cat > "$TEMP_DIR/docker-compose" << 'EOF'
#!/bin/bash
docker compose "$@"
EOF

# Make the wrapper script executable
chmod +x "$TEMP_DIR/docker-compose"

# Add the temporary directory to PATH if not already there
if [[ ":$PATH:" != *":$TEMP_DIR:"* ]]; then
    export PATH="$TEMP_DIR:$PATH"
fi

echo "Created docker-compose wrapper that calls 'docker compose'"
echo "Starting WordPress environment..."

# Run wp-env start
npx wp-env start

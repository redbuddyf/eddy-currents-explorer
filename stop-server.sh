#!/bin/bash

PORT=8080
PID=$(lsof -ti:$PORT)

if [ -n "$PID" ]; then
    echo "🛑 Stopping server on port $PORT..."
    kill $PID 2>/dev/null
    echo "✅ Server stopped!"
else
    echo "ℹ️  No server running on port $PORT"
fi

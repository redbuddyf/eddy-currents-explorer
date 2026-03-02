#!/bin/bash

# Science Unpacked - Local Server Script

PORT=8080
PID=$(lsof -ti:$PORT)

if [ -n "$PID" ]; then
    echo "🛑 Stopping existing server on port $PORT..."
    kill $PID 2>/dev/null
    sleep 1
fi

echo "🚀 Starting Science Unpacked server..."
echo ""

# Start Python HTTP server
python3 -m http.server $PORT &

sleep 2

echo "✅ Server is running!"
echo ""
echo "🌐 Open your browser and go to:"
echo "   http://localhost:$PORT"
echo ""
echo "📁 Serving files from: $(pwd)"
echo ""
echo "Press Ctrl+C to stop the server"

# Keep script running
wait

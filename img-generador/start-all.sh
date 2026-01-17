#!/bin/bash

echo "🚀 Iniciando servidores..."

cd backend
echo "📡 Iniciando backend en puerto 5000..."
npm start &
BACKEND_PID=$!

cd ../frontend
echo "🎨 Iniciando frontend en puerto 5173..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servidores iniciados:"
echo "   Backend:  http://localhost:5000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Presiona Ctrl+C para detener ambos servidores"

function cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup INT

wait
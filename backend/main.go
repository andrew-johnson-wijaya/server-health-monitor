package main

import (
    "encoding/json"
    "log"
    "math/rand"
    "net/http"
)

type ServerMetrics struct {
    CPUUsage    float64 `json:"cpu_usage"`
    MemoryUsage float64 `json:"memory_usage"`
    Uptime      string  `json:"uptime"`
    Status      string  `json:"status"`
}

func metricsHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")

    metrics := ServerMetrics{
        CPUUsage:    rand.Float64() * 100,
        MemoryUsage: rand.Float64() * 100,
        Uptime:      "24h 12m",
        Status:      "Healthy",
    }

    json.NewEncoder(w).Encode(metrics)
}

func main() {
    http.HandleFunc("/api/metrics", metricsHandler)
    
    log.Println("Go Backend running on http://localhost:8080...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
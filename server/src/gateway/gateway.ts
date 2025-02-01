import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TelemetryDataDTO } from './telemetry-data.dto';
import { numberOfVehicles, interval } from 'src/constants';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173'],
  },
})
export class MyGateway implements OnModuleInit, OnModuleDestroy {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    console.log('WebSocket Gateway initialized');
    this.server.on('connection', (socket) => {
      console.log(socket.id, 'Connected');
      socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected');
      });
      socket.on('error', (err) => {
        console.error('Socket error:', err);
      });
    });
    // emiting telemetry data for every 5 seconds
    this.startTelemetryDataUpdates();
  }

  private generateTelemetryData(vehicleId: string): TelemetryDataDTO {
    return {
      vehicleId,
      speed: Math.random() * (120 - 30) + 30, // Speed between 0 and 120 km/h
      battery: Math.random() * 100, // Battery percentage between 0 and 100
      lat: 52.52 + Math.random() * 0.01, // Random latitude around Berlin
      lan: 13.405 + Math.random() * 0.01, // Random longitude around Berlin
      temperature: Math.random() * 40, // Temperature between 0 and 40 degrees Celsius
      tirePressure: Math.random() * 35 + 25, // Tire pressure between 25 and 60 psi
      engineEfficiency: Math.random() * 100, // Efficiency percentage between 0 and 100
      motorPower: Math.random() * 200, // Power between 0 and 200 kW
      regenBraking: Math.random() > 0.5, // Randomly on/off
      distanceTraveled: Math.random() * 500, // Distance between 0 and 500 km
      vehicleHealth: Math.random() > 0.8 ? 'error' : 'normal', // Random health status (normal or error)
      timestamp: new Date().toISOString(), // Current timestamp
    };
  }

  private startTelemetryDataUpdates() {
    // Simulate telemetry updates for vehicles every 5 seconds
    setInterval(() => {
      const allTelemetryData: Record<string, TelemetryDataDTO> = {};

      for (let i = 1; i <= numberOfVehicles; i++) {
        const vehicleId = `vehicle-${i}`;
        const telemetryData = this.generateTelemetryData(vehicleId);
        allTelemetryData[vehicleId] = telemetryData; // Add telemetry data for each vehicle
      }

      // Emit the telemetry data as a plain object
      this.server.emit('telemetryUpdate', allTelemetryData);
    }, interval); // Update every 'interval' ms (e.g., 5000ms for 5 seconds)
  }

  async onModuleDestroy() {
    console.log('Shutting down WebSocket server');
    await this.server.close(); // Close connections gracefully
  }
}

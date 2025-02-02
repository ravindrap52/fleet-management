import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TelemetryDataDTO } from './telemetry-data.dto';
import { numberOfVehicles } from 'src/constants';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173'],
  },
})
export class MyGateway implements OnModuleInit, OnModuleDestroy {
  @WebSocketServer()
  server: Server;

  private lastSpeeds: Record<string, number> = {};

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id, 'Connected');
      socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected');
      });
      socket.on('error', (err) => {
        console.error('Socket error:', err);
      });
    });
    // emit the data
    this.startTelemetryDataUpdates();
  }

  private generateTelemetryData(vehicleId: string): TelemetryDataDTO {
    const previousSpeed = this.lastSpeeds[vehicleId] || 30;
    const speed = this.generateSmoothSpeedTransition(previousSpeed);

    // Update the last speed for the vehicle
    this.lastSpeeds[vehicleId] = speed;

    return {
      vehicleId,
      speed: speed, // speed
      battery: Math.random() * 100, // Battery
      lat: 52.52 + Math.random() * 0.1 - 0.05, // Latitude around Berlin
      lan: 13.405 + Math.random() * 0.1 - 0.05, // Longitude  Berlin
      temperature: Math.random() * 40, // Temperature between 0 and 40 degrees Celsius
      tirePressure: Math.random() * 35 + 25, // Tire pressure between 25 and 60 psi
      engineEfficiency: Math.random() * 100, // Efficiency percentage between 0 and 100
      motorPower: Math.random() * 200, // Power between 0 and 200 kW
      regenBraking: Math.random() > 0.5, // Randomly on/off
      distanceTraveled: Math.random() * 500, // Distance between 0 and 500 km
      vehicleHealth: Math.random() > 0.8 ? 'error' : 'normal', // Random health status (normal or error)
      timeSinceLastMaintenance: Math.floor(Math.random() * 365), // Days since last maintenance
      energyConsumption: Math.random() * (50 - 5) + 5, // Energy consumed between 5 kWh and 50 kWh
      distanceToNextChargingStation: Math.random() * (100 - 0), // Distance to next charging station in km
      status: ['active', 'idle', 'charging', 'maintenance', 'off'][
        Math.floor(Math.random() * 5)
      ], // Random vehicle status
      batteryHealth: Math.random() * (100 - 70) + 70, // Battery health between 70% and 100%
      timestamp: new Date().toISOString(), // Current timestamp
    };
  }

  private generateSmoothSpeedTransition(previousSpeed: number): number {
    const minSpeedChange = -10;
    const maxSpeedChange = 10;

    const speedChange =
      Math.random() * (maxSpeedChange - minSpeedChange) + minSpeedChange;
    const newSpeed = Math.max(30, Math.min(120, previousSpeed + speedChange));

    return newSpeed;
  }

  private startTelemetryDataUpdates() {
    const emitTelemetryData = () => {
      const allTelemetryData: Record<string, TelemetryDataDTO> = {};

      for (let i = 1; i <= numberOfVehicles; i++) {
        const vehicleId = `vehicle-${i}`;
        const telemetryData = this.generateTelemetryData(vehicleId);
        allTelemetryData[vehicleId] = telemetryData; // Add telemetry data for each vehicle
      }

      this.server.emit('telemetryUpdate', allTelemetryData);

      // calling at random interval between 1 to 5 sec
      const randomInterval = Math.floor(Math.random() * 5000) + 1000;
      setTimeout(emitTelemetryData, randomInterval);
    };

    emitTelemetryData();
  }

  async onModuleDestroy() {
    console.log('Shutting down WebSocket server');
    await this.server.close();
  }
}

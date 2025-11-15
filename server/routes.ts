import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/subscribe", async (req, res) => {
    try {
      const emailSchema = insertSubscriberSchema.extend({
        email: z.string().email("Invalid email address"),
      });
      
      const data = emailSchema.parse(req.body);
      
      const existing = await storage.getSubscriberByEmail(data.email);
      if (existing) {
        return res.status(409).json({ 
          error: "Email already subscribed",
          message: "This email address is already registered for notifications." 
        });
      }
      
      const subscriber = await storage.createSubscriber(data);
      
      return res.status(201).json({ 
        success: true,
        message: "Successfully subscribed! You'll receive a notification when we're back online.",
        subscriber: { email: subscriber.email } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid input",
          message: error.errors[0].message 
        });
      }
      console.error("Subscription error:", error);
      return res.status(500).json({ 
        error: "Server error",
        message: "Failed to process your subscription. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

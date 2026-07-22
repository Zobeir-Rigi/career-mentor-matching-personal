import { PrismaService } from "./prisma.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [PrismaService],
    exports: [PrismaService]
    // NestJS exports: means:Other Nest modules can use PrismaService through Dependency Injection.
    // This has nothing to do with TypeScript imports.
})

export class PrismaModule{}
// typeScript export, so Other TypeScript files can import this class.
// we create this file so other file have access to prismaService

// constructor(private prisma: PrismaService) {}, 
// You're making the provider available to Nest's Dependency Injection system.
// We create PrismaModule so other modules can access PrismaService through Nest's Dependency Injection system.
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

// why we need to create this? because,just like AuthService, inject PrismaService,
//  the controller injects:AuthService. controller->service->database
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post ('signup')
    signup(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.signup(email, password)
        }

    @Post('login')
    login(
        @Body('email') email: string,
        @Body('password') password: string
    ){
        return this.authService.login(email, password)
    }

 }
    


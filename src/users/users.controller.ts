import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUser() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOneUser(@Param('id') userId: number) {
    return this.usersService.findOne(userId);
  }

  @Post()
  createUser(@Body() req) {
    return this.usersService.createUser(req);
  }

  @Delete(':id')
  removeUser(@Param('id') userId: number) {
    return this.usersService.remove(userId);
  }

  @Patch(':id')
  updateUser(@Param('id') userId: number, @Body() req) {
    return this.usersService.update(userId, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

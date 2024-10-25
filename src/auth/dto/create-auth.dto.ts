import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: "Foydalanuvchi nomi bo'sh bo'lishi mumkin emas" })
    @IsString({ message: "Foydalanuvchi nomi faqat matn bo'lishi kerak" })
    @MinLength(3, { message: "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak" })
    @MaxLength(20, { message: "Foydalanuvchi nomi 20 ta belgidan oshmasligi kerak" })
    username: string;

    @IsNotEmpty({ message: "Parol bo'sh bo'lishi mumkin emas" })
    @IsString({ message: "Parol matn shaklida bo'lishi kerak" })
    @MinLength(3, { message: "Parol kamida 3 ta belgidan iborat bo'lishi kerak" })
    @MaxLength(50, { message: "Parol 50 ta belgidan oshmasligi kerak" })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { 
        message: "Parol kamida bitta katta harf, kichik harf, son va maxsus belgi o'z ichiga olishi kerak" 
    })
    password: string;

    @IsNotEmpty({ message: "Email bo'sh bo'lishi mumkin emas" })
    @IsString({ message: "Email matn shaklida bo'lishi kerak" })
    @IsEmail({}, { message: "Yaroqli email manzilini kiriting" })
    email: string;
}

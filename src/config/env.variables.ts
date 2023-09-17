import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EnvVariables {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  public APP_PORT: number = 3000;

  @IsString()
  @IsNotEmpty()
  public DB_HOST: string = "localhost";

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  public DB_PORT: number = 5432;

  @IsString()
  @IsNotEmpty()
  public DB_USERNAME: string = "postgres";

  @IsString()
  @IsNotEmpty()
  public DB_PASSWORD: string = "postgres";

  @IsString()
  @IsNotEmpty()
  public DB_NAME: string = "reservation_api";
}

import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class EnvVariables {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  public APP_PORT: number = 3000;
}

import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @ApiResponse({status:201, type:CreateAssetResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDTO: WatchlistDTO, @Req() request):Promise<CreateAssetResponse> {
    const user = request.user.id;
    return this.watchlistService.createAsset(user, assetDTO);
  }
  
  @ApiTags('API')
  @ApiResponse({status:200})
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteAsset(@Query('id') assetId: string, @Req() request):Promise<boolean> {
    const {id} = request.user
    return this.watchlistService.deleteAsset(id, assetId)
  }
}

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

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDTO: WatchlistDTO, @Req() request) {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDTO);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteAsset(@Query('id') assetId: string, @Req() request):Promise<boolean> {
    const {id} = request.user
    return this.watchlistService.deleteAsset(id, assetId)
  }
}

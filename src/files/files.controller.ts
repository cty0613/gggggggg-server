import { Controller, Post, Delete, Body, UseInterceptors, UploadedFile, UseGuards, Query, Param, ValidationPipe} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { bookPageMetaDto } from './dto/page-meta.dto';
import { ApiBearerAuth, ApiConsumes, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload/page')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File upload',
        schema: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadPage(
        @Body() metaData: bookPageMetaDto,
        @UploadedFile() file: Express.Multer.File) {
        return this.filesService.uploadPage(metaData, file);
    }


    @Delete('delete/page')
    async deletePage(@Body() metaData: bookPageMetaDto) {
        return this.filesService.deletePage(metaData);
    }



}

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Res,
    HttpStatus,
    Body,
    Param,
    NotFoundException,
    Query,
    BadRequestException,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { ValidateObjectId } from './pipes/validate-object-id.pipes.ts.pipe';

@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService,
    ) { }

    @Post('/create')
    async createPost(
        @Res() res,
        @Body() createProductDTO: CreateProductDTO,
    ) {

        const PRODUCT = await this.productService.createProduct(createProductDTO);

        return res.status(HttpStatus.OK).json({
            message: 'Product Created Successfully',
            PRODUCT,
        });
    }

    @Get('/')
    async getProducts(
        @Res() res,
    ) {

        const PRODUCTS = await this.productService.getProducts();

        return res.status(HttpStatus.OK).json({
            PRODUCTS,
        });
    }

    @Get('/:productId')
    async getProduct(
        @Res() res,
        @Param('productId', new ValidateObjectId()) productId,
    ) {

        const PRODUCT = await this.productService.getProduct(productId)
            .catch(error => {
                throw new BadRequestException(error);
            });
        if (!PRODUCT) { throw new NotFoundException(`Product with ID: ${productId} does not exist.`); }

        return res.status(HttpStatus.OK).json({
            PRODUCT,
        });
    }

    @Delete('/delete')
    async deleteProduct(
        @Res() res,
        @Query('productId', new ValidateObjectId()) productId,
    ) {

        const PRODUCT_DELETED = await this.productService.deleteProduct(productId)
            .catch(error => {
                throw new BadRequestException(error);
            });
        if (!PRODUCT_DELETED) { throw new NotFoundException(`Product with ID: ${productId} does not exist.`); }

        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            PRODUCT_DELETED,
        });
    }

    @Put('/update')
    async updateProduct(
        @Res() res,
        @Body() createProductDTO: CreateProductDTO,
        @Query('productId', new ValidateObjectId()) productId,
    ) {

        const UPDATED_PRODUCT = await this.productService.updateProduct(productId, createProductDTO)
            .catch(error => {
                throw new BadRequestException(error);
            });
        if (!UPDATED_PRODUCT) { throw new NotFoundException(`Product with ID: ${productId} does not exist.`); }

        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            UPDATED_PRODUCT,
        });
    }

}

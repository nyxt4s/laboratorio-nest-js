import { Controller, Get, Req, Post, Header, Redirect, Query, Param, HostParam, Body } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './CreateCatDTO';

// The @Controller() decorator marks this class as a Nest controller.
// The string 'cats' is the base route for this controller.
@Controller('cats')
export class CatsController {
    // The @Get() decorator marks this method as a route handler for GET requests.
    // When a GET request is made to the base route ('/cats'), this method will be called.
    // The method returns a string response.
    // This is a simple example, and in a real application, you would likely return more complex data.
    @Get('breeds') // This route will respond to GET requests made to '/cats/breeds'
    @Redirect('https://nestjs.com', 301)
    // When we place a decorator on a method, the decorator is responsable for creating an endpoint 
    // named the same as the method name
    // in the case, the endpoint is /cat/breeds
    findAll(@Req() req : Request): string {
        return 'This action returns all cats';
    }

    @Post()
    @Header('Cache-Control', 'no-store')
    create(): string {
    return 'This action adds a new cat';
    }
    
    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302) // Redirect to the NestJS documentation
    // The @Query() decorator extracts query parameters from the request URL.}
    // In this case, it extracts the 'version' query parameter.
    // The method checks if the 'version' parameter is present and equals '5'.
    // If so, it returns a different URL for the documentation.
    getDocs(@Query('version') version: string) {
    if (version && version === '5') {
        return { url: 'https://docs.nestjs.com/v5/' };
    }
    }
    // The @Param() decorator extracts route parameters from the request URL.
    // In this case, it extracts the 'id' parameter from the URL.
    // The method logs the 'id' parameter to the console and returns a string response.
    // The 'id' parameter is expected to be a string, but you can also specify a type for it.
    // The 'params' object contains all route parameters, and you can access them using the parameter name.
    @Get(':id')
    findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
    }

    // The @Param() decorator extracts route parameters from the request URL.
    // In this case, it extracts the 'id' parameter from the URL.   
    // The method logs the 'id' parameter to the console and returns a string response.
    // The 'id' parameter is expected to be a string, but you can also specify a type for it.
    @Get('extra/:id')
    findOneExtra(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
    }

    // The method is asynchronous, which allows it to handle asynchronous operations like database queries.
    @Get()
    async findAllAsync(): Promise<any[]> {
    return [];
    }
    // The method returns an Observable that emits an array of cats.
    // This is useful for handling asynchronous operations in a reactive programming style.
    // The Observable can be created using the 'of' function from the 'rxjs' library.
    // The 'of' function creates an Observable that emits the provided value.
    @Get()
    findAllObservable(): Observable<any[]> {
    return of([]);
    }

    // When a POST request is made to the base route ('/cats'), this method will be called.
    // The method accepts a CreateCatDto object as the request body.
    // The CreateCatDto class is a Data Transfer Object (DTO) that defines the structure of the request body.
    // The @Body() decorator extracts the request body and maps it to the CreateCatDto object.
    // The method returns a string response indicating that a new cat has been added.
    @Post()
    async createCat(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
    }
    //Parameter Request
    // The @Query() decorator extracts query parameters from the request URL.
    // In this case, it extracts the 'age' and 'breed' query parameters.
    // The method returns a string response that includes the values of the 'age' and 'breed' parameters.
    // The 'age' parameter is expected to be a number, and the 'breed' parameter is expected to be a string.
    // GET /cats?age=2&breed=Persian
    @Get()
    async findAllParameters(@Query('age') age: number, @Query('breed') breed: string) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
    }
}

// The @Controller() decorator can also take an object with a 'host' property.
// This allows you to create a controller that responds to requests made to a specific host.
// In this case, the controller will respond to requests made to 'admin.example.com'.
// The 'host' property can be a string or a regular expression.
@Controller({ host: 'admin.example.com' })
export class AdminController {
    @Get()
    index(): string {
        return 'Admin page';
    }
}

// The @Controller() decorator can also take an object with a 'host' property.
// This allows you to create a controller that responds to requests made to a specific host.
// In this case, the controller will respond to requests made to 'admin.example.com'.
// The 'host' property can be a string or a regular expression.
// The @HostParam() decorator extracts the host parameter from the request URL.
// In this case, it extracts the 'account' parameter from the URL.
// The method logs the 'account' parameter to the console and returns a string response.
@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}

    
//query parameters
// The @Query() decorator extracts query parameters from the request URL.
// In this case, it extracts the 'age' and 'breed' query parameters.
// The method returns a string response that includes the values of the 'age' and 'breed' parameters.
//  Example Path GET /cats?age=2&breed=Persian
@Controller('cats/query')
export class CatsQueryController {
    @Get()
    findAll(@Query('age') age: number, @Query('breed') breed: string): string {
        return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
    }

    //other example PAth GET /cats/query?age=2&breed=Persian
    // The @Query() decorator extracts query parameters from the request URL.
    // In this case, it extracts the 'age' and 'breed' query parameters.
    // The method returns an array of cats filtered by the provided 'age' and 'breed' parameters.
    @Get()
    findAllWithArray(@Query('age') age: number, @Query('breed') breed: string): any[] {
    // Aquí iría la lógica para filtrar gatos
    return [{ name: 'Michi', age, breed }];
}
}
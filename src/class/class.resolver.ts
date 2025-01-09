import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Class } from './entity/class.entity';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';

@Resolver(() => Class)
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

  @Query(() => Class)
  async class(@Args('id', { type: () => Int }) id: number) {
    return this.classService.findOne(id);
  }

  @Query(() => [Class])
  async classes() {
    return this.classService.findAll();
  }

  @Mutation(() => String)
  createClass(
    @Args('createClassDto') createClassDto: CreateClassDto,
  ): Promise<string> {
    return this.classService.create(createClassDto);
  }

  @Mutation(() => String)
  updateClass(
    @Args('updateClassDto') updateClassDto: UpdateClassDto,
  ): Promise<string> {
    return this.classService.update(updateClassDto);
  }

  @Mutation(() => String)
  deleteClass(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.classService.delete(id);
  }
}

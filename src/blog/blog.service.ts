import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import saveImage from 'src/utils/saveImage';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: Model<Blog>,
  ) {}
  create = async (createBlogDto: any, files?) => {
    const imageUrl = await saveImage(files[0], 'someId', 'Blog');
    const blog = new this.blogModel({ ...createBlogDto, imageUrl });
    blog.save();
    console.log(blog);
    if (blog) return true;
    else false;
  };

  findAll = async () => {
    return await this.blogModel.find();
  };

  findOne = async (id: string) => {
    return await this.blogModel.findOne({ _id: id });
  };

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  updateState = async (id: string) => {
    const blog = await this.findOne(id);
    return await this.blogModel.updateOne(
      { _id: id },
      { active: !blog.active },
    );
  };

  remove = async (id: string) => {
    return await this.blogModel.findOneAndDelete({ _id: id });
  };

  filterBlog = async (filters: { tags: string[]; input: string }) => {
    const { tags, input } = filters;
    if (input !== '' && tags.length === 0)
      return await this.blogModel.find({
        name: { $regex: `.*${input}.*` },
        active: true,
      });
    if (input === '' && tags.length > 0)
      return await this.blogModel.find({
        categorie: { $in: tags },
        active: true,
      });
    return await this.blogModel.find({
      categorie: { $in: tags },
      name: { $regex: `.*${input}.*` },
      active: true,
    });
  };

  getByName = async (name: string) => {
    return await this.blogModel.findOne({ name: name });
  };

  getRecentBlogs = async () => {
    return await this.blogModel
      .find()
      .select('name imageUrl')
      .limit(3)
      .sort({ date: -1 });
  };
}

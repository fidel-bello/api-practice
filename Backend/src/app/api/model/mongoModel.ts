/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import mongoose, { Schema, Document } from 'mongoose';
import uniqueV from 'mongoose-unique-validator';

export interface IModel extends Document {
    createdAt? : number
}

export type SchemaDefinition = {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined>
  } | {
    [x: string]: mongoose.SchemaDefinitionProperty<any> | undefined
  } | undefined

const baseDefinition: SchemaDefinition = {
  createdAt: { type: Number }
};

export type SchemaOptions = mongoose.SchemaOptions | undefined;

const baseOptions: SchemaOptions = {
  strict: false
};

export class Model {
  public schema: mongoose.Schema;

  public model: mongoose.Model<any>;

  constructor(public definition: SchemaDefinition, public options?: SchemaOptions) {
    this.definition = { ...this.definition, ...baseDefinition };
    this.options = this.options ? { ...this.options, ...baseOptions } : baseOptions;
    this.schema = new Schema(definition, options);
    this.schema.plugin(uniqueV);
  }

  async add(data: Document): Promise <Document> {
    const modelData = { ...data, createdAt: Date.now() };
    // eslint-disable-next-line no-return-await
    return await this.model.create(modelData);
  }
}

import { Request } from 'express';
import {IProject} from '@astra/common';

export interface ProjectRequest extends Request {
    project?: IProject;
}

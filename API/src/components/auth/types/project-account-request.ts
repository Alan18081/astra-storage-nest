import { Request } from 'express';
import {IProject} from '@astra/common';

export interface ProjectAccountRequest extends Request {
    projectAccount: IProject;
}

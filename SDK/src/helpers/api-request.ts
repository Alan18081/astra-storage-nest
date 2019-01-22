import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '../config';

export function apiRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return axios.create({
    baseURL: API_URL,
  }).request(config);
}
import {IStorageRecord} from '@astra/common';

export const mapStorageRecord = (data: IStorageRecord[] | IStorageRecord) => {
    if (!data) {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(item => ({ id: item.id, ...item.data }));
    } else {
        return { id: data.id, ...data.data };
    }
};

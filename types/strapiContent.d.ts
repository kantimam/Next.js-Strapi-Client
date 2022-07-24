export type StrapiMediaData = {
    id: number;
    attributes: {
        url: string;
        name: string;
        alternativeText: string;
        width: number;
        height: number

        formats: {
            thumbnail: {
                url: string;
                width: number;
                height: number;
            };
        };
    };
}
export type StrapiMediaItem = {
    data: StrapiMediaData
}
export type StrapiMediaList = {
    data: StrapiMediaData[]
}
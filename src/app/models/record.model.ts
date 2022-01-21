export class Record {
    id: number;
    code: string;
    sigla: string;
    name: string;
    name_en: string;
    alive: boolean;
    version: string;
    url: string;
    new_client_url: string;
    logo: string;
    email: string;
    web: string;
    street: string;
    city: string;
    zip: string;
    latitude: string;
    longitude: string;
    collections: number;
    recommended_all: number;
    recommended_public: number;
    documents_all: number;
    documents_public: number;
    pages_all: number;
    pages_public: number;
    created_at: Date;
    updated_at: Date;
    model_monograph_all: number;
    model_monograph_public: number;
    model_periodical_all: 2;
    model_periodical_public: 2;
    model_soundrecording_all: number;
    model_soundrecording_public: number;
    model_map_all: number;
    model_map_public: number;
    model_graphic_all: number;
    model_graphic_public: number;
    model_sheetmusic_all: number;
    model_sheetmusic_public: number;
    model_archive_all: number;
    model_archive_public: number;
    model_manuscript_all: number;
    model_manuscript_public: number;
    model_article_all: number;
    model_article_public: number;
    model_periodicalitem_all: number;
    model_periodicalitem_public: number;
    model_supplement_all: number;
    model_supplement_public: number;
    model_periodicalvolume_all: number;
    model_periodicalvolume_public: number;
    model_monographunit_all: number;
    model_monographunit_public: number;
    model_track_all: number;
    model_track_public: number;
    model_soundunit_all: number;
    model_soundunit_public: number;
    model_internalpart_all: number;
    model_internalpart_public: number;
    model_oldprintomnibusvolume_all: number;
    model_oldprintomnibusvolume_public: number;
    model_picture_all: number;
    model_picture_public: number;

    static build(source: any): Record {
        const record = new Record();
        record.name = source['name'];
        record.name_en = source['name_en'];
        record.code = source['code'];
        record.alive = !!source['alive'];
        record.created_at = new Date(source['created_at']);
        return record;
    } 

    getTitleForLanguage(lang: string): string {
        if (lang == "cs") {
            return this.name;
        } else {
            return this.name_en;
        }
    }

}
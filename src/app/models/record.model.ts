export class Record {
    id: number;
    code: string;
    sigla: string;
    name: string;
    name_en: string;
    alive: boolean;
    state_duration: number;
    version: string;
    url: string;
    new_client_url: string;
    new_client_version: string;
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
    model_convolute_all: number;
    model_convolute_public: number;
    model_picture_all: number;
    model_picture_public: number;
    last_document_at: Date;
    last_document_before: number;
    licenses: [];
    dnnto: number;


    static build(source: any): Record {
        const record = new Record();
        record.id = source['id'];
        record.code = source['code'];
        record.sigla = source['sigla'];
        record.name = source['name'];
        record.name_en = source['name_en'] || '';
        record.alive = !!source['alive'];
        record.state_duration = source['state_duration'];
        record.version = source['version'];
        record.url = source['url'];
        record.new_client_url = source['new_client_url'];
        record.new_client_version = source['new_client_version'];
        record.logo = source['logo'];
        record.email = source['email'];
        record.web = source['web'];
        record.street = source['street'];
        record.city = source['city'];
        record.zip = source['zip'];
        record.latitude = source['latitude'];
        record.longitude = source['longitude'];
        record.collections = source['collections'];
        record.recommended_all = source['recommended_all'];
        record.recommended_public = source['recommended_public'];
        record.documents_all = source['documents_all'];
        record.documents_public = source['documents_public'];
        record.pages_all = source['pages_all'];
        record.pages_public = source['pages_public'];
        record.created_at = source['created_at'];
        record.updated_at = source['updated_at'];
        record.model_monograph_all = source['model_monograph_all'];
        record.model_monograph_public = source['model_monograph_public'];
        record.model_periodical_all = source['model_periodical_all'];
        record.model_periodical_public = source['model_periodical_public'];
        record.model_soundrecording_all = source['model_soundrecording_all'];
        record.model_soundrecording_public = source['model_soundrecording_public'];
        record.model_map_all = source['model_map_all'];
        record.model_map_public = source['model_map_public'];
        record.model_graphic_all = source['model_graphic_all'];
        record.model_graphic_public = source['model_graphic_public'];
        record.model_sheetmusic_all = source['model_sheetmusic_all'];
        record.model_sheetmusic_public = source['model_sheetmusic_public'];
        record.model_archive_all = source['model_archive_all'];
        record.model_archive_public = source['model_archive_public'];
        record.model_manuscript_all = source['model_manuscript_all'];
        record.model_manuscript_public = source['model_manuscript_public'];
        record.model_article_all = source['model_article_all'];
        record.model_article_public = source['model_article_public'];
        record.model_periodicalitem_all = source['model_periodicalitem_all'];
        record.model_periodicalitem_public = source['model_periodicalitem_public'];
        record.model_supplement_all = source['model_supplement_all'];
        record.model_supplement_public = source['model_supplement_public'];
        record.model_periodicalvolume_all = source['model_periodicalvolume_all'];
        record.model_periodicalvolume_public = source['model_periodicalvolume_public'];
        record.model_monographunit_all = source['model_monographunit_all'];
        record.model_monographunit_public = source['model_monographunit_public'];
        record.model_track_all = source['model_track_all'];
        record.model_track_public = source['model_track_public'];
        record.model_soundunit_all = source['model_soundunit_all'];
        record.model_soundunit_public = source['model_soundunit_public'];
        record.model_internalpart_all = source['model_internalpart_all'];
        record.model_internalpart_public = source['model_internalpart_public'];
        record.model_convolute_all = source['model_convolute_all'];
        record.model_convolute_public = source['model_convolute_public'];
        record.model_picture_all = source['model_picture_all'];
        record.model_picture_public = source['model_picture_public'];
        record.created_at = new Date(source['created_at']);
        if (source['last_document_at']) {
            record.last_document_at = new Date(source['last_document_at']);
        }
        record.last_document_before = source['last_document_before'];
        if (source['licenses'].filter((licence: { [x: string]: string; }) => licence.id === 'dnnto')[0]) {
            record.dnnto = source['licenses'].filter((licence: { [x: string]: string; }) => licence.id === 'dnnto')[0].count;
        }
        record.licenses = source['licenses'];
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
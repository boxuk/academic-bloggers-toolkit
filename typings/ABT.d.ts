interface Window {
  tinyMCE: TinyMCE.tinyMCE
}

interface InputEvent extends UIEvent {
    target: HTMLInputElement
}

declare namespace ABT {

    interface FieldMappings {
        bill: FieldMap
        book: FieldMap
        chapter: FieldMap
        'legal_case': FieldMap
        'paper-conference': FieldMap
        'entry-encyclopedia': FieldMap
        'motion_picture': FieldMap
        speech: FieldMap
        'article-journal': FieldMap
        'article-magazine': FieldMap
        'article-newspaper': FieldMap
        patent: FieldMap
        report: FieldMap
        legislation: FieldMap
        thesis: FieldMap
        broadcast: FieldMap
        webpage: FieldMap
    }

    interface FieldMap {
        title: string
        fields: Field[]
        people: {
            label: string
            type:
                'author'|
                'container-author'|
                'editor'|
                'director'|
                'interviewer'|
                'illustrator'|
                'composer'|
                'translator'|
                'recipient'|
                'collection-editor'
        }[]
    }

    interface Field {
        value: string
        label: string
        required: boolean
        pattern: string
        placeholder: string
    }
}

declare namespace TinyMCE {

    interface tinyMCE {
        DOM: any
        EditorManager: any
        PluginManager: PluginManager
        EditorObservable: any
        Env: any
        WindowManager: any
        activeEditor: Editor
        add: (a:any) => any
        dom: any
        editors: any[]
        remove: (e?: any) => void
    }

    interface Editor {
        id: string
        buttons: any
        container: any
        contentDocument: HTMLDocument
        contentWindow: Window
        controlManager: any
        dom: any
        editorCommands: any
        editorContainer: any
        editorManager: any
        editorUpload: any
        insertContent(any): any
        setProgressState(state: number): void
        addShortcut(keys: string, title: string, func: Function): void
        on(eventString: string, callback: Function): void
        addButton(buttonID: string, buttonObj: any): void
        plugins: any
        settings: any
        target: any
        windowManager: WindowManager
        wp: any
    }

    interface WindowManager {
        alert: (a?:any) => any
        close: (a?:any) => any
        confirm: (a?:any) => any
        createInstance: (a?:any) => any
        editor: Editor
        getParams: (a?:any) => any
        getWindows: (a?:any) => any
        onClose: any
        onOpen: any
        open: (a?:any) => any
        parent: any
        setParams: (a?:any) => any
        windows: any
        wp: any
    }

    interface PluginManager {
        add(pluginName: string, callback: Function)
    }

    interface MenuItem {
        text: string
        menu?: MenuItem[]
        onclick?: (e?: Event) => void
        disabled?: boolean
        id?: string
    }

    interface WindowElement {
        type: string
        name: string
        label: string
        value: string
        tooltip?: string
    }

    interface WindowMangerObject {
        title: string
        width: number
        height: any
        body?: WindowElement[]
        url?: string
        onclose?: (e?) => void
    }
}

declare namespace CSL {

    type CitationType =
        'article'|'article-journal'|'article-magazine'|'article-newspaper'|
        'bill'|'book'|'broadcast'|'chapter'|'dataset'|'entry'|'entry-dictionary'|
        'entry-encyclopedia'|'figure'|'graphic'|'interview'|'legal_case'|
        'legislation'|'manuscript'|'map'|'motion_picture'|'musical_score'|
        'pamphlet'|'paper-conference'|'patent'|'personal_communication'|'post'|
        'post-weblog'|'report'|'review'|'review-book'|'song'|'speech'|'thesis'|
        'treaty'|'webpage';


    interface Citation {
        schema: 'https://github.com/citation-style-language/schema/raw/master/csl-citation.json'
        citationID: string|number
        citationItems?: CitationItem[]
        properties?: {
            noteIndex: number
        }
    }


    interface CitationItem {
        id: string|number
        itemData?: string
        prefix?: string
        suffix?: string
        locator?: string
        label?:
            'book'|
            'chapter'|
            'column'|
            'figure'|
            'folio'|
            'issue'|
            'line'|
            'note'|
            'opus'|
            'page'|
            'paragraph'|
            'part'|
            'section'|
            'sub verbo'|
            'verse'|
            'volume'
        'suppress-author'?: string|number|boolean
        'author-only'?: string|number|boolean
        uris?: string[]
    }

    interface Data {
        id?: string|number
        type?: CitationType
        categories?: string[]
        language?: string
        journalAbbreviation?: string
        shortTitle?: string
        author?: Person[]
        'collection-editor'?: Person[]
        composer?: Person[]
        'container-author'?: Person[]
        director?: Person[]
        editor?: Person[]
        'editorial-director'?: Person[]
        interviewer?: Person[]
        illustrator?: Person[]
        'original-author'?: Person[]
        recipient?: Person[]
        'reviewed-author'?: Person[]
        translator?: Person[]
        accessed?: Date
        container?: Date
        'event-date'?: Date
        'issued'?: Date
        'original-date'?: Date
        submitted?: Date
        abstract?: string
        annote?: string
        archive?: string
        'archive-location'?: string
        'achive-place'?: string
        authority?: string
        'call-number'?: string
        'chapter-number'?: string
        'citation-number'?: string
        'citation-label'?: string
        'collection-number'?: string
        'collection-title'?: string
        'container-title'?: string
        'container-title-short'?: string
        dimensions?: string
        DOI?: string
        edition?: string|number
        event?: string
        'event-place'?: string
        'first-reference-note-number'?: string
        genre?: string
        ISBN?: string
        ISSN?: string
        issue?: string|number
        jurisdiction?: string
        keyword?: string
        locator?: string
        medium?: string
        note?: string
        number?: string|number
        'number-of-pages'?: string
        'number-of-volumes'?: string|number
        'original-publisher'?: string
        'original-publisher-place'?: string
        'original-title'?: string
        'page'?: string
        'page-first'?: string
        PMCID?: string
        PMID?: string
        publisher?: string
        'publisher-place'?: string
        references?: string
        'reviewed-title'?: string
        scale?: string
        section?: string
        source?: string
        status?: string
        title?: string
        'title-short'?: string
        URL?: string
        version?: string
        volume?: string|number
        'year-suffix'?: string
    }

    interface Person {
        family?: string
        given?: string
        'dropping-particle'?: string
        'non-dropping-particle'?: string
        suffix?: string
        'comma-suffix'?: string|number|boolean
        'static-ordering'?: string|number|boolean
        literal?: string
        'parse-names'?: string|number|boolean
    }

    /**
     * Skipped Person Types:
     *   - collection-editor
     *   - editorial-director
     *   - original-author
     *   - reviewed-author
     */
    interface TypedPerson extends Person {
        type:
            'author'|
            'container-author'|
            'editor'|
            'director'|
            'interviewer'|
            'illustrator'|
            'composer'|
            'translator'|
            'recipient'
    }

    interface Date {
        'date-parts'?: [ (number|string)[] ]
        season?: string|number
        circa?: string|number|boolean
        literal?: string
        raw?: string
    }

}

declare namespace Citeproc {

    interface SystemObj {
        retrieveLocale(lang: string): string
        retrieveItem(id: string|number): CSL.Data
    }

}

declare namespace PubMed {

    type Data = SingleReference[]

    interface SingleReference {
        articleids?: {
            idtype: string
            idtypen: number
            value: string
        }[]
        attributes?: string[]
        authors?: Author[]
        availablefromurl?: string
        bookname?: string
        booktitle?: string
        chapter?: string
        doccontriblist?: string[]
        docdate?: string
        doctype?: string
        edition?: string
        elocationid?: string
        epubdate?: string
        essn?: string
        fulljournalname?: string
        history?: {
            date: string /** NOTE: format: 'YYYY/MM/DD HH:MM' */
            pubstatus: string
        }[]
        issn?: string
        issue?: string
        lang?: string[]
        lastauthor?: string /** NOTE: format: 'Lastname FM' */
        sortpubdate?: string /** NOTE: format: 'YYYY/MM/DD HH:MM' */
        sorttitle?: string
        source?: string
        srccontriblist?: string[]
        srcdate?: string
        title?: string
        uid?: string
        vernaculartitle?: string
        viewcount?: number
        volume?: string
    }

    interface Author {
      authtype?: string
      clusterid?: string
      name?: string
      firstname?: string
      lastname?: string
      middleinitial?: string
    }

}
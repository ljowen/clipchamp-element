import api_key from '../../api_key.js';
import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

declare global {
    interface Window { clipchamp: any; }
}
declare const clipchamp;

@Component({
    selector: 'clipchamp-btn',
    templateUrl: './clipchamp.component.html',
    styleUrls: ['./clipchamp.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class ClipchampComponent implements OnInit {
    private clipchamp = null;

    @Input()
    public label = 'Upload with Clipchamp!';

    @Input()
    public size = 'medium';

    @Input()
    public title = 'Ye\' olde video-upload shoppe';

    @Input()
    public inputs = ['file', 'camera'];

    @Input()
    public output = 'dummy';

    @Output()
    public onWebcamStatusChange: EventEmitter<any> = new EventEmitter();

    get clipchampOptions() {
        return {
            title: this.title,
            output: this.output,
            // Web components should support arrays in Dom props but test case shows otherwise
            inputs: Array.isArray(this.inputs) ? this.inputs : JSON.parse(this.inputs),
            onWebcamStatusChange: (...args) => this.onWebcamStatusChange.emit(args),
        };
    }

    onClick() {
        window.clipchamp.update(this.clipchampOptions);
        window.clipchamp.open();
    }

    // @todo refactor this into a singleton service
    injectScript() {
        const script = document.createElement('script');
        script.onload = function () {
            window.clipchamp = clipchamp(this.clipchampOptions);
        }.bind(this);
        script.src = `https://api.clipchamp.com/${api_key}/button.js`;
        script.type = 'text/javascript';
        document.head.appendChild(script);
    }

    ngOnInit() {
        document.onreadystatechange = function (e) {
            if (document.readyState === 'complete') {
                this.injectScript();
            }
        }.bind(this);
    }
}

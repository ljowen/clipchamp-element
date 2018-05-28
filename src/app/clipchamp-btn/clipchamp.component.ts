import api_key from '../../api_key.js';
import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

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
        console.log(this.inputs);
        return {
            title: this.title,
            output: this.output,
            inputs: this.inputs,
            onWebcamStatusChange: (...args) => this.onWebcamStatusChange.emit(args),
        };
    }

    onClick() {
        this.clipchamp.open();
    }

    injectScript() {
        const script = document.createElement('script');
        script.onload = function () {
            console.log('script onload', this);
            this.clipchamp = clipchamp(this.clipchampOptions);
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

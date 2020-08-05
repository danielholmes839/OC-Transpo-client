import React from "react";


class HistoryManager {
    constructor(name, size) {
        this.name = name
        this.size = size
        this.items = this.get();
        console.log('called constructor');
    }

    get() {
        let history = localStorage.getItem(this.name);
        if (history == null) {
            return [];
        }
        else {
            return JSON.parse(history);
        }
    }

    add(stop) {
        this.items.unshift(stop);
        if (this.items.length > this.size) {
            this.items = this.items.slice(0, this.size);
        }
        this.save();
    }

    save() {
        let history = JSON.stringify(this.items)
        localStorage.setItem(this.name, history);
    }
}

const HistoryContext = React.createContext(null);
export { HistoryContext, HistoryManager };
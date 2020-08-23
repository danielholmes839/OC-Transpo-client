import React from "react";


class StopHistory {
    constructor(name, size) {
        this.name = name
        this.size = size
        this.items = this.read();
    }

    read() {
        let history = localStorage.getItem(this.name);
        if (history == null) {
            return [];
        }
        else {
            return JSON.parse(history);
        }
    }

    add(item) {
        this.items = this.items.filter(existing => existing !== item)
        this.items.unshift(item);
        if (this.items.length > this.size) {
            this.items = this.items.slice(0, this.size);
        }
        this.save();
    }

    save() {
        let history = JSON.stringify(this.items)
        localStorage.setItem(this.name, history);
    }

    clear() {
        this.items = [];
        this.save();
    }
}

const StopHistoryContext = React.createContext(null);
export { StopHistoryContext, StopHistory };
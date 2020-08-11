import { observable, action, decorate } from "mobx";
class FeedsStore {
    feeds = [];
    selected = 0;
    setFeeds(feeds) {
        this.feeds = feeds;
    }
    setSelected(index) {
        this.selected = index;
    }
}
FeedsStore = decorate(FeedsStore, {
    feeds: observable,
    setFeeds: action,
    selected: observable,
    setSelected: action,
});
export { FeedsStore };
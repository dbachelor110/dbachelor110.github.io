class drag{
    // e.3

    static log = (text = ``)=>{
        console.log(`Drag ${text}`);
    }

    static getItem = (element = new HTMLElement)=>{
        while(element.classList.contains(`item`) != true){
            element = element.parentElement;
            // console.log(`${element.localName}`);
        }
        return element;
    }

    static Count = {
        set:(element = new HTMLElement, attr = ``, value = 0)=>{
            element.setAttribute(attr,`${value}`);
            return value;
        },
        add:(element = new HTMLElement, attr = ``)=>{
            let count = parseInt(element.getAttribute(attr));
            element.setAttribute(attr,`${count+1}`);
            return count+1;
        },
        sub:(element = new HTMLElement, attr = ``)=>{
            let count = parseInt(element.getAttribute(attr));
            element.setAttribute(attr,`${count-1}`);
            return count-1;
        },
    }

    static style = {
        add:(target = new HTMLElement)=>{
            let element = this.getItem(target);
            let count = this.Count.add(element,`enter`);
            if(count === 1){
                element.classList.add(`over`);
                let p = element.querySelector(`div > p`);
                let name = p.textContent;
                this.log(`enter ${name}`);
            }
            return element;
        },
        sub:(target = new HTMLElement)=>{
            let element = this.getItem(target);
            let count = this.Count.sub(element,`enter`);
            if(count === 0){
                element.classList.remove(`over`);
                let p = element.querySelector(`div > p`);
                let name = p.textContent;
                this.log(`leave ${name}`);
            }
            return element;
        },
    }

    static start = (e = new Event)=>{
        // e.target.classList.add(`dragging`);
        admin.draggingElement = e.target.parentElement;
        this.log(`start`);
    }

    static over = (e = new Event)=>{
        e.preventDefault();
        this.log(`over`);
    }

    static drop = (e = new Event)=>{
        e.preventDefault();
        let element = this.style.sub(e.target);
        let children = Array.from(admin.list.children);
        let inser = children.indexOf(element);
        let from = children.indexOf(admin.draggingElement);
        this.log(`drop from ${from} to ${inser}`);

        // 若往下移動
        if(inser > from){
            
            // 更改編號
            // admin.draggingElement 編號設為 inser + 1
            this.Count.set(admin.draggingElement,`dataindex`,inser);
            admin.draggingElement.querySelector(`span`).textContent = inser + 1;
            for(let i = from + 1; i < inser + 1; i++){
                // 影響範圍編號 -1
                let number = this.Count.sub(children[i],`dataindex`);
                children[i].querySelector(`span`).textContent = number + 1;
            }
            inser += 1;
        }else{ // 若往上移動

            // 更改編號
            // admin.draggingElement 編號設為 inser + 1
            this.Count.set(admin.draggingElement,`dataindex`,inser);
            admin.draggingElement.querySelector(`span`).textContent = inser + 1;
            for(let i = inser; i < from; i++){
                // 影響範圍編號 +1
                let number = this.Count.add(children[i],`dataindex`);
                children[i].querySelector(`span`).textContent = number + 1;
            }
        }
        admin.list.insertBefore(admin.draggingElement,children[inser]);
    }

    static enter = (e = new DragEvent)=>{
        e.preventDefault();
        let element = e.target;
        console.log(`${element.localName}`);
        this.style.add(element);
    }

    static leave = (e = new Event)=>{
        e.preventDefault();
        let element = e.target;
        console.log(`${element.localName}`);
        this.style.sub(element);
    }
}

class admin{
    static list = document.getElementById(`list`);
    static listItems = [];
    static draggingElement;
    static addListeners = ()=>{
        const draggables = document.querySelectorAll(`.draggable`);
        draggables.forEach(draggable => {
            draggable.addEventListener(`dragstart`,drag.start)
        });
        const Items = this.list.querySelectorAll(`li`);
        Items.forEach(item =>{
            item.addEventListener(`dragover`,drag.over);
            item.addEventListener(`drop`,drag.drop);
            item.addEventListener(`dragenter`,drag.enter);
            item.addEventListener(`dragleave`,drag.leave);
        });
    };
    static createList = (list = [``])=>{
        let count = 0;
        for(let i of list){
            const listItem = document.createElement(`li`);
            listItem.setAttribute(`dataIndex`,count++);
            listItem.setAttribute(`class`,`item`);
            listItem.setAttribute(`enter`,`0`);
            listItem.innerHTML = `
            <span class="number">${parseInt(listItem.getAttribute(`dataIndex`))+1}</span>
            <div class="draggable" draggable="true";>
                <p class="itemName">${i}</p>
            </div>
            `;
            this.listItems.push(listItem);

            this.list.appendChild(listItem);
        }
        this.addListeners();
    };
}
let itemList = [];
for(let i = 0; i < 5; i++){
    itemList.push(`item ${i+1}`);
}
admin.createList(itemList);
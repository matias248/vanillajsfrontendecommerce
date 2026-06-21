type ConfirmDialogShopButtonProps = {
    functionToDo: () => void,
    title: string,
    styleOverride: string,
}
export class ConfirmDialogShopButton {

    private props: ConfirmDialogShopButtonProps | undefined;
     button : HTMLElement;

    constructor(params: ConfirmDialogShopButtonProps) {
        this.props = params;
        this.button = document.createElement('button');
        this.button.setAttribute("name", "confirmDialogShopButton"); 
        this.render();
    }

    private render(){
        this.button.onclick = () => this.props?.functionToDo();
        this.button.className = " bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white " + (this.props?.styleOverride ?? "");
        this.button.textContent = this.props?.title ?? "";
       
    }

    mounted(father:HTMLElement){
        father.appendChild(this.button);
    }

}
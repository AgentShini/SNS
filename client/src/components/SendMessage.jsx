export default function SendMessage(){
    return(
        <form className="flex flex-row items-center justify-center p-4">
        <input type="text" placeholder="Type here" name = "message" className="input input-bordered input-success w-full max-w-xs" />
        <button type= "submit" className="btn glass mx-4">Send</button>
        </form>
    )
}
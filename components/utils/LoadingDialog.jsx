import { ActivityIndicator, Dialog, MD2Colors, Paragraph, Portal } from "react-native-paper";

const LoadingDialog = ({setShowDialog, showDialog}) => {

    return (
        <Portal>
            <Dialog visible={showDialog} onDismiss={() => { setShowDialog(false) }}>

                <Dialog.Content className="flex-row">
                    <Paragraph className="">  Please wait for some time..</Paragraph>
                    <ActivityIndicator animating={true} color={MD2Colors.red800} className="ml-4" />
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}


export default LoadingDialog;
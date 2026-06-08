import * as Dialog from "@radix-ui/react-dialog";
import CloseIcon from "../../components/CloseIcon";
import TradeForm from "./TradeForm";

interface TradeDialogProps {
  onClose: () => void;
}

const TradeDialog = ({ onClose }: TradeDialogProps) => {
  return (
    <Dialog.Root defaultOpen onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card w-11/12 sm:w-sm">
          <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
            <CloseIcon />
          </Dialog.Close>
          <Dialog.Title className="sr-only">Trade</Dialog.Title>
          <Dialog.Description className="sr-only">
            Buy or sell Bitcoin
          </Dialog.Description>

          <TradeForm onClose={onClose} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TradeDialog;

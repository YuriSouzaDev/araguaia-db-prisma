import Drawer, { DrawerProps } from '@/components/shared/sheet-drawer';
import NewVehicleForm from './new-vehicle-form';

interface VehicleDrawer extends DrawerProps {}

const VehicleDrawer: React.FC<VehicleDrawer> = ({
  openDrawer,
  closeDrawer,
}) => {
  return (
    <div>
      <Drawer openDrawer={openDrawer} closeDrawer={closeDrawer}>
        <NewVehicleForm closeDrawer={closeDrawer} />
      </Drawer>
    </div>
  );
};

export default VehicleDrawer;

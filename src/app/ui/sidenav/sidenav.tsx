import SidenavLinks from '@/app/ui/sidenav/sidenav-links';

export default function SideNav(){
    return (
        <div className="col-start-1 flex h-full flex-col px-3 py-4 bg-light-grayish-blue md:px-2">
            <div className="flex flex-col items-center gap-10 md:flex-col md:space-x-0 md:space-y-2">
                <SidenavLinks />
            </div>
        </div>
    )
}
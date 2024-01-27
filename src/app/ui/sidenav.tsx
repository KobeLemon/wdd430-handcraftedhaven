import NavLinks from '@/app/ui/nav-links';

export default function SideNav(){
    return (
        <div className="flex h-full flex-col px-3 py-4 bg-light-grayish-blue md:px-2">
            <div className="flex grow flex-row items-start space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
            </div>
        </div>
    )
}
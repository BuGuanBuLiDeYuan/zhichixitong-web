import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
    name: string;
    href: string;
    current?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex mb-6" aria-label="面包屑导航">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                        aria-label="返回首页"
                    >
                        <HomeIcon className="w-4 h-4 mr-2" />
                        首页
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.href}>
                        <div className="flex items-center">
                            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                            {item.current ? (
                                <span
                                    className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
                                    aria-current="page"
                                >
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
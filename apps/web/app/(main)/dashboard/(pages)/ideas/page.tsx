'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  GitBranch,
  GitCommit,
  ExternalLink,
  Edit,
  Archive,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Mock data
const repositories = [
  {
    id: 1,
    name: 'react-dashboard',
    icon: '📊',
    isActive: true,
    prs: 3,
    commits: 12,
  },
  {
    id: 2,
    name: 'api-gateway',
    icon: '🚪',
    isActive: false,
    prs: 1,
    commits: 8,
  },
  {
    id: 3,
    name: 'mobile-app',
    icon: '📱',
    isActive: false,
    prs: 2,
    commits: 15,
  },
  {
    id: 4,
    name: 'ml-pipeline',
    icon: '🤖',
    isActive: false,
    prs: 0,
    commits: 5,
  },
];

const ideas = [
  {
    id: 1,
    repoName: 'react-dashboard',
    title: 'Added dark mode support',
    type: 'PR',
    reference: '#142',
    preview:
      'Just shipped dark mode for our dashboard! 🌙 Users can now toggle between light and dark themes with smooth transitions...',
    status: 'New',
    createdAt: '2 hours ago',
  },
  {
    id: 2,
    repoName: 'api-gateway',
    title: 'Implemented rate limiting',
    type: 'Commit',
    reference: 'a7b3c9d',
    preview:
      'Enhanced our API security with intelligent rate limiting! 🛡️ Now handling 10k+ requests per minute with graceful degradation...',
    status: 'Converted',
    createdAt: '1 day ago',
  },
  {
    id: 3,
    repoName: 'react-dashboard',
    title: 'Performance optimization',
    type: 'PR',
    reference: '#138',
    preview:
      'Boosted dashboard performance by 40%! ⚡ Implemented lazy loading, code splitting, and optimized bundle size...',
    status: 'New',
    createdAt: '3 days ago',
  },
];

const statusFilters = ['All', 'New', 'Converted', 'Archived'];

export default function IdeasPage() {
  const [selectedRepo, setSelectedRepo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.repoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || idea.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>ideas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="w-full max-w-6xl mx-auto py-6 px-6">
        <div className="mb-8">
          <div>
            <p className="text-3xl font-bold">my ideas</p>
            <p className="text-foreground/70 mt-1 text-sm">
              manage and organize your post ideas here
            </p>
          </div>
        </div>
        <div className=" mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search ideas by text, repo, or PR title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={selectedRepo.toString()}
                onValueChange={(value) =>
                  setSelectedRepo(Number.parseInt(value))
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All repos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All repos</SelectItem>
                  {repositories.map((repo) => (
                    <SelectItem key={repo.id} value={repo.id.toString()}>
                      {repo.icon} {repo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-1">
                {statusFilters.map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className="h-8"
                  >
                    {status}
                  </Button>
                ))}
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="repo">Repo name</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Idea
            </Button>
          </div>
        </div>
        <div className="flex mx-auto gap-8">
          <div className="w-80">
            <div className="py-6">
              <h2 className="font-semibold text-lg text-sidebar-foreground mb-4">
                Repositories
              </h2>
              <div className="space-y-2">
                {repositories.map((repo) => (
                  <Card
                    key={repo.id}
                    className={`cursor-pointer transition-all hover:bg-sidebar-accent/50 ${
                      selectedRepo === repo.id
                        ? 'bg-sidebar-accent border-sidebar-primary'
                        : ''
                    }`}
                    onClick={() => setSelectedRepo(repo.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{repo.icon}</span>
                          <span className="font-medium text-sm">
                            {repo.name}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {repo.prs} PRs
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {repo.commits}
                          </Badge>
                        </div>
                      </div>
                      {selectedRepo === repo.id && (
                        <div className="mt-3 space-y-2">
                          <Separator />
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <GitBranch className="h-3 w-3" />
                                <span>feat/dark-mode</span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs"
                              >
                                Generate
                              </Button>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <GitCommit className="h-3 w-3" />
                                <span>Fix responsive layout</span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs"
                              >
                                Generate
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 py-6">
            {filteredIdeas.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-lg font-semibold mb-2">No ideas yet</h3>
                <p className="text-muted-foreground mb-4">
                  Connect a repo or generate an idea to get started
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Idea
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Ideas ({filteredIdeas.length})
                  </h2>
                  {statusFilter !== 'All' && (
                    <Badge variant="outline">Filtered by: {statusFilter}</Badge>
                  )}
                </div>
                <div className="grid gap-4">
                  {filteredIdeas.map((idea) => (
                    <Card
                      key={idea.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {
                                  repositories.find(
                                    (r) => r.name === idea.repoName,
                                  )?.icon
                                }{' '}
                                {idea.repoName}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {idea.type} {idea.reference}
                              </Badge>
                              <Badge
                                variant={
                                  idea.status === 'New'
                                    ? 'default'
                                    : idea.status === 'Converted'
                                    ? 'secondary'
                                    : 'outline'
                                }
                                className="text-xs"
                              >
                                {idea.status}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-balance">
                              {idea.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {idea.createdAt}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Convert to Post
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-pretty leading-relaxed">
                          {idea.preview}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="gap-2">
                            <ExternalLink className="h-3 w-3" />
                            Convert to Post
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 bg-transparent"
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-2">
                            <Archive className="h-3 w-3" />
                            Archive
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

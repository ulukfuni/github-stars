import React, { useState, useEffect } from 'react'

import Flex from './components/Flex'
import GitHubCard from './components/GithubCard'

/**
 * get 100 github repos with stars over 30000
 * @return {object} data { total_count, items, incomplete_results }
 */
const getRepos = async () => {
	try {
		const res = await fetch('https://api.github.com/search/repositories?q=stars:%3E30000&per_page=100')
		const data = await res.json()
		return data
	} catch (e) {
		return false
	}
}

const GitHubStars = () => {
	const [ repos, setRepos ] = useState([])
	// 24 hrs before today
	const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString()
	useEffect(() => {
		async function get() {
			const res = await getRepos()
			if (res === false) {
				setRepos(false)
			}
			setRepos(res.items)
		}
		get()
	}, [])
	if (repos === false || repos.message) {
		return <div>Welp, GitHub API is not looking so well...</div>
	} 
	if (repos && repos.length === 0) {
		return <div>Getting Repos...</div>
	}
	return (
		<>
			<h1>Top 100 Most Starred Github Repos</h1>
			<Flex flexWrap="wrap">
				{ repos.map(repo => (
						<GitHubCard key={repo.name} repo={repo} yesterday={yesterday} />
				))}
			</Flex>
		</>
	)
}

export default GitHubStars
